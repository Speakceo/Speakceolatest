import { addDays, format, startOfDay } from 'date-fns';

export type BatchStatus = 'FULL' | 'FILLING' | 'OPEN';

export type BatchTrack = 'Morning track' | 'Evening track';

export interface CohortBatchRow {
  date: Date;
  dateLabel: string;
  track: BatchTrack;
  status: BatchStatus;
}

/** Days until the next cohort intake (rolling weekly batches). */
export const DAYS_UNTIL_NEXT_BATCH = 7;

/** Reference intake used to derive cohort number (Cohort 12 ≈ May 12, 2026). */
const REFERENCE_COHORT_NUMBER = 12;
const REFERENCE_COHORT_START = startOfDay(new Date('2026-05-12'));

const BATCH_STATUS_MATRIX: BatchStatus[][] = [
  ['FULL', 'FILLING'],
  ['FILLING', 'OPEN'],
  ['OPEN', 'OPEN'],
];

const BATCH_TRACKS: BatchTrack[] = ['Morning track', 'Evening track'];

function atStartOfDay(date: Date): Date {
  return startOfDay(date);
}

/** Next cohort start = today + 7 days (always rolling forward). */
export function getNextBatchStartDate(from: Date = new Date()): Date {
  return addDays(atStartOfDay(from), DAYS_UNTIL_NEXT_BATCH);
}

export function formatBatchDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function formatBatchDateShort(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

/** Three weekly intakes: +7d, +14d, +21d — morning & evening tracks each. */
export function getUpcomingCohortBatches(from: Date = new Date()): CohortBatchRow[] {
  const base = atStartOfDay(from);
  const weekOffsets = [DAYS_UNTIL_NEXT_BATCH, DAYS_UNTIL_NEXT_BATCH * 2, DAYS_UNTIL_NEXT_BATCH * 3];

  return weekOffsets.flatMap((offset, weekIdx) => {
    const date = addDays(base, offset);
    return BATCH_TRACKS.map((track, trackIdx) => ({
      date,
      dateLabel: formatBatchDate(date),
      track,
      status: BATCH_STATUS_MATRIX[weekIdx][trackIdx],
    }));
  });
}

/** Active cohort label increments each week as batches roll forward. */
export function getActiveCohortNumber(from: Date = new Date()): number {
  const nextStart = getNextBatchStartDate(from);
  const weeksSinceReference = Math.round(
    (nextStart.getTime() - REFERENCE_COHORT_START.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return REFERENCE_COHORT_NUMBER + weeksSinceReference;
}

export function getActiveCohortLabel(from: Date = new Date()): string {
  return `Cohort ${getActiveCohortNumber(from)}`;
}

/** Human-readable next start for CTAs and forms. */
export function getNextBatchStartLabel(from: Date = new Date()): string {
  return formatBatchDate(getNextBatchStartDate(from));
}

/** Spots urgency copy tied to the upcoming intake week. */
export function getSpotsRemainingCopy(spots = 30, from: Date = new Date()): string {
  return `${getActiveCohortLabel(from)} · ${spots} spots remaining`;
}

/** Event dates spaced weekly after the next batch window. */
export function getRollingEventDates(from: Date = new Date(), count = 3): Date[] {
  const base = atStartOfDay(from);
  return Array.from({ length: count }, (_, i) =>
    addDays(base, DAYS_UNTIL_NEXT_BATCH * (i + 2))
  );
}

export function batchStatusLabel(status: BatchStatus): string {
  if (status === 'FILLING') return 'Filling fast';
  if (status === 'FULL') return 'Full';
  return 'Enrolling';
}
