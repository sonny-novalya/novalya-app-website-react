import GlobeIcon from '../../../../../../assets/img/note-globe.svg';
import FbIcon from '../../../../../../assets/img/note-fb.svg';
import InstagramIcon from '../../../../../../assets/img/note-instagram.svg';
import LinkedinIcon from '../../../../../../assets/img/note-linkedin.svg';
import XIcon from '../../../../../../assets/img/note-x.svg';
import YoutubeIcon from '../../../../../../assets/img/note-youtube.svg';
import InfoIcon from '../../../../../../assets/img/note-info.svg';
import CopyIcon from '../../../../../../assets/img/note-copy.svg';

const NotesSection = () => {
    const socialLinks = [
        { icon: GlobeIcon, url: "https://app.novalya.com/" },
        { icon: FbIcon, url: "https://www.facebook.com/" },
        { icon: InstagramIcon, url: "https://www.instagram.com/" },
        { icon: LinkedinIcon, url: "https://www.linkedin.com/" },
        { icon: XIcon, url: "https://x.com/" },
        { icon: YoutubeIcon, url: "https://youtube.com/" },
    ];

    return (
        <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium flex items-center gap-[6px]">
                Socials
                <img src={InfoIcon} alt="info" />
            </label>

            <div className="flex flex-wrap justify-between gap-y-4">
                {socialLinks.map((item, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[30px_1fr_30px] items-center gap-1.5 border border-gray-300 rounded w-[calc(50%-10px)] "
                    >
                        <div className="w-[30px] h-[30px] flex items-center justify-center border-r border-gray-300">
                            <img src={item.icon} alt="social icon" />
                        </div>
                        <input
                            type="text"
                            defaultValue={item.url}
                            className="text-xs text-black/80 truncate focus:outline-none bg-transparent px-1 w-full"
                        />
                        <button className="bg-transparent p-1 flex items-center justify-center border-none">
                            <img src={CopyIcon} alt="copy icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesSection;
