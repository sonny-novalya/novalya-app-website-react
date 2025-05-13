const UserAvatar = () => {
    return (
        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
            <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </div>
    );
};

export default UserAvatar