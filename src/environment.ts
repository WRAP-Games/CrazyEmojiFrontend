import { Category } from "./definitions";

export const environment = {
    homePageWelcomeMessages: [
        {
            from: 0,
            to: 5,
            message: "Good night"
        },
        {
            from: 5,
            to: 9,
            message: "Rise and shine"
        },
        {
            from: 9,
            to: 12,
            message: "Good morning"
        },
        {
            from: 12,
            to: 17,
            message: "Good afternoon"
        },
        {
            from: 17,
            to: 21,
            message: "Good evening"
        },
        {
            from: 21,
            to: 23,
            message: "Good night"
        }
    ],
    homePageFallbackWelcomeMessage: "Good evening",
    categories: [
        {
            name: 'Celebrities',
            description: 'Guess the famous people behind the emojis!',
            image: 'categories/celebrities.jpg'
        } as Category,
        {
            name: 'Emotions & Feelings',
            description: 'Identify different moods and feelings expressed with emojis.',
            image: 'categories/emotions_feelings.jpg'
        } as Category,
        {
            name: 'Everyday Actions & Routines',
            description: 'Decode common daily activities from fun emoji combinations.',
            image: 'categories/actions_routines.jpg'
        } as Category,
        {
            name: 'Famous Songs',
            description: 'Can you guess the hit songs hidden in emojis?',
            image: 'categories/famous_songs.jpg'
        } as Category,
        {
            name: 'Idioms & Phrases',
            description: 'Figure out well-known sayings and expressions with emojis.',
            image: 'categories/idioms_phrases.jpg'
        } as Category,
        {
            name: 'Internet & Pop Culture',
            description: 'Spot the trends, memes, and viral icons represented in emojis.',
            image: 'categories/internet_pop_culture.jpg'
        } as Category,
        {
            name: 'Movie Characters',
            description: 'Guess the iconic characters from films shown with emojis.',
            image: 'categories/movie_characters.jpg'
        } as Category,
        {
            name: 'Movies',
            description: 'Can you name the movies hinted at by emoji sequences?',
            image: 'categories/movies.jpg'
        } as Category,
        {
            name: 'Pop Stars',
            description: 'Identify popular music stars from clever emoji clues.',
            image: 'categories/pop_stars.jpg'
        } as Category,
        {
            name: 'Simple Events & Moments',
            description: 'Recognize everyday life events depicted in emojis.',
            image: 'categories/events_moments.jpg'
        } as Category,
        {
            name: 'Tv Shows',
            description: 'Guess the TV series represented by emoji combinations.',
            image: 'categories/tv_shows.jpg'
        } as Category,
        {
            name: 'Video Games',
            description: 'Identify classic and modern games from fun emoji hints.',
            image: 'categories/video_games.jpg'
        } as Category
    ]
}