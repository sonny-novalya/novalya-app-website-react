export const getGroupVolumeTitle = (type) => {
    switch (type) {
        case 'member':
        case 'things in common':
            return 'Members';
        case 'post-like':
        case 'post':
        case 'insta_likepost':
            return 'Likes';
        case 'insta_profile':
            return 'Followers';
        case 'insta_hashtag':
            return 'Posts';
        default:
            return 'Unknown';
    }
};
