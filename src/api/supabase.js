/**
 * Supabase API Wrapper
 * 
 * Types:
 * - Post: Represents a post in the public post board.
 *   {
 *     id: number,
 *     title: string,
 *     body: string,
 *     created_at: string,
 *     author_id: string
 *   }
 * 
 * - Reaction: Represents a reaction to a post.
 *   {
 *     id: number,
 *     post_id: number,
 *     user_id: string,
 *     emoji: string
 *   }
 */

import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const queryClient = new QueryClient();
export const SupabaseProvider = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);