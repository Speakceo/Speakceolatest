import type { Message, Poll, PollResponse, PollStats } from '../types/messages';

// All community features work in offline mode - Supabase disabled

// Message functions
export async function getMessages(limit = 10, offset = 0) {
  try {
    // Return empty messages in offline mode
    console.log('Messages: Working in offline mode');
    return [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function createMessage(content: string) {
  try {
    console.log('Creating message in offline mode');
    // Silently succeed - no database
    return { id: Date.now().toString(), content, created_at: new Date().toISOString() } as Message;
  } catch (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to create message');
  }
}

export async function upvoteMessage(id: string) {
  try {
    console.log('Upvote in offline mode');
    return { id } as Message;
  } catch (error) {
    console.error('Error upvoting message:', error);
    throw new Error('Failed to upvote message');
  }
}

// Poll functions
export async function getActivePolls() {
  try {
    console.log('Polls: Working in offline mode');
    // Return empty polls array
    return [];
  } catch (error) {
    console.error('Error fetching polls:', error);
    return [];
  }
}

export async function getPollResponses(poll_id: string): Promise<PollStats> {
  try {
    console.log('Poll responses: Working in offline mode');
    return {
      poll_id,
      question: 'Poll Question',
      options: [],
      total_votes: 0,
      user_has_voted: false,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching poll responses:', error);
    throw error;
  }
}

export async function submitPollResponse(poll_id: string, selected_option: number) {
  try {
    console.log('Submitting poll response in offline mode');
    return { id: Date.now().toString(), poll_id, selected_option } as PollResponse;
  } catch (error) {
    console.error('Error submitting poll response:', error);
    throw new Error('Failed to submit poll response');
  }
}

export async function getUserPollResponses(user_id: string) {
  try {
    console.log('User poll responses: Working in offline mode');
    return [];
  } catch (error) {
    console.error('Error fetching user poll responses:', error);
    return [];
  }
}
