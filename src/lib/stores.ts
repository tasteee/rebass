import { writable } from 'svelte/store';
import type { User, AudioAsset } from './types';
import { mockUsers } from './data';

// Current user state (simulating logged in user)
export const currentUser = writable<User | null>(mockUsers[0]);

// Playing audio state
export const currentlyPlaying = writable<AudioAsset | null>(null);

// Liked assets
export const likedAssets = writable<Set<string>>(new Set());

// Following users
export const followingUsers = writable<Set<string>>(new Set(['2', '3']));

// Search query
export const searchQuery = writable<string>('');

// Selected filters
export const selectedType = writable<string>('all');
export const selectedTags = writable<string[]>([]);
