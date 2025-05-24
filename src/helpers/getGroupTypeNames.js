export const getGroupTypeNames = (name) => {
    switch (name.toLowerCase()) {
        case 'member':
            return 'Member';
        case 'things in common':
            return 'Things In Common';
        case 'post-like':
            return 'Post Like';
        case 'post':
            return 'Post';
        case 'insta_profile':
            return 'Profile';
        case 'insta_likepost':
            return 'Post';
        case 'insta_hashtag':
            return 'Hashtag';
        default:
            return 'Unknown';
    }
};
