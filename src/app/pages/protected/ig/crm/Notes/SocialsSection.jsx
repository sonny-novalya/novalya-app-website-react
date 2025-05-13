import PropTypes from 'prop-types';
import GlobeIcon from '../../../../../../assets/img/note-globe.svg';
import FbIcon from '../../../../../../assets/img/note-fb.svg';
import InstagramIcon from '../../../../../../assets/img/note-instagram.svg';
import LinkedinIcon from '../../../../../../assets/img/note-linkedin.svg';
import XIcon from '../../../../../../assets/img/note-x.svg';
import YoutubeIcon from '../../../../../../assets/img/note-youtube.svg';
import InfoIcon from '../../../../../../assets/img/note-info.svg';
import CopyIcon from '../../../../../../assets/img/note-copy.svg';

const platforms = [
    { icon: GlobeIcon, key: "website", placeholder: "https://app.novalya.com/" },
    { icon: FbIcon, key: "facebook", placeholder: "https://www.facebook.com/" },
    { icon: InstagramIcon, key: "instagram", placeholder: "https://www.instagram.com/" },
    { icon: LinkedinIcon, key: "linkedin", placeholder: "https://www.linkedin.com/" },
    { icon: XIcon, key: "twitter", placeholder: "https://x.com/" },
    { icon: YoutubeIcon, key: "youtube", placeholder: "https://youtube.com/" },
];

const SocialsSection = ({ socials, handleSocialChange }) => {

    return (
        <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium flex items-center gap-[6px]">
                Socials
                <img src={InfoIcon} alt="info" />
            </label>

            <div className="flex flex-wrap justify-between gap-y-4">
                {platforms.map(({ icon, key, placeholder }) => (
                    <div
                        key={key}
                        className="grid grid-cols-[30px_1fr_30px] items-center gap-1.5 border border-gray-300 rounded w-[calc(50%-10px)]"
                    >
                        <div className="w-[30px] h-[30px] flex items-center justify-center border-r border-gray-300">
                            <img src={icon} alt={`${key} icon`} />
                        </div>
                        <input
                            type="text"
                            value={socials[key] || ''}
                            onChange={(e) => handleSocialChange(key, e.target.value)}
                            className="text-xs text-black/80 truncate focus:outline-none bg-transparent px-1 w-full"
                            placeholder={placeholder}
                        />
                        <button
                            className="bg-transparent p-1 flex items-center justify-center border-none"
                            onClick={() => {
                                const url = socials[key] || '';
                                if (url) {
                                    navigator.clipboard.writeText(url);
                                    window.open(url, '_blank');
                                }
                            }}
                        >
                            <img src={CopyIcon} alt="copy icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

SocialsSection.propTypes = {
    socials: PropTypes.shape({
        website: PropTypes.string,
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        twitter: PropTypes.string,
        linkedin: PropTypes.string,
        youtube: PropTypes.string
    }),
    handleSocialChange: PropTypes.func.isRequired
};

SocialsSection.defaultProps = {
    socials: {
        website: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: ''
    }
};

export default SocialsSection;