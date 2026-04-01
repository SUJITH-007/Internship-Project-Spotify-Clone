import "../styles/landingPage.css";
import { Link } from "react-router-dom";
import spotifyLogo from "../Images/spotify-Logo.png";
import homeLogo from "../Images/house.png"
import searchIcon from "../Images/magnifying-glass.png";
import libraryIcon from "../Images/folder.png";
import webLogo from "../Images/world-wide-web.png";
import plusLogo from "../Images/plus.png";
import Luzroja from "../Images/Songs/Luzroja.jpg";
import vocenamira from "../Images/Songs/vocenamira.jpg";
import MJ from "../Images/Artists/MJ.jpg";
import weekend from "../Images/Artists/weekend.jpg";
import Thinkingofyou from "../Images/Songs/Thinkingofyou.jpg";
import Arijit from "../Images/Artists/Arijit_singh.jpg"
import Adele from "../Images/Artists/adele.jpg";
import AVA from "../Images/Artists/AVA.jpg";
import chrisGrey from "../Images/Artists/chrisGrey.jpg";
import codplay from "../Images/Artists/codplay.jpg";
import Eminem from "../Images/Artists/Eminem.jpg";
import Ladygaga from "../Images/Artists/Ladygaga.jpg";
import Marshmello from "../Images/Artists/Marshmello.jpg";
import MIIA from "../Images/Artists/MIIA.jpg";
import NCTS from "../Images/Artists/NCTS.jpg";
import Pritam from "../Images/Artists/Pritam.jpg";
import RaviBasrur from "../Images/Artists/RaviBasrur.jpg";
import samCS from "../Images/Artists/samCS.jpg";
import Shreya from "../Images/Artists/Shreya.jpg";
import ALNacer from "../Images/Songs/ALNacer.jpg";
import billie_jean from "../Images/Songs/billie_jean.jpg";
import dare from "../Images/Songs/dare.jpg";
import DarkAria from "../Images/Songs/DarkAria.jpg";
import dreamOn from "../Images/Songs/dreamOn.jpg";
import GoldenBrown from "../Images/Songs/GoldenBrown.jpg";
import HeadOfTheTable from "../Images/Songs/HeadOfTheTable.jpg";
import mortals from "../Images/Songs/mortals.jpg";
import sajde from "../Images/Songs/sajde.jpg";
import saopaulo from "../Images/Songs/sao paulo.jpg";
import slavicQueen from "../Images/Songs/slavicQueen.jpg";
import TDRCAU from "../Images/Songs/TDRCAU.jpg";
import playButton from "../Images/play-button.png";
import LuzRoja from "../Images/Albums/LuzRoja.jpg"
import Mahavatar from "../Images/Albums/MahavatarNarshimha.jpg";
import CantoDeLuna from "../Images/Albums/CantoDeLuna.jpg";
import FunkCriminal from "../Images/Albums/FunkCriminal.jpg";
import Goldenbrown from "../Images/Albums/GoldenBrown.jpg";
import AlNacer from "../Images/Albums/ALNacer.jpg";
import BringMeToLife from "../Images/Albums/BringMeToLife.jpg";
import NaBatidao from "../Images/Albums/NaBatidao.jpg";
import Next from "../Images/Albums/Next.jpg";
import PassoBemSolto from "../Images/Albums/PassoBemSolto.jpg";
import SlavaFunk from "../Images/Albums/SlavaFunk.jpg";
import VaiSentar from "../Images/Albums/VaiSentar.jpg"
import VoceNaMira from "../Images/Albums/VoceNaMira.jpg";
import Salaar from "../Images/Albums/Salaar.jpg";
import Dare from "../Images/Albums/Dare.jpg";

function landingPage() {
    return (
        <div className="landing-page">
            <nav className="top-navbar">
                <div className="nav-left">
                    <img src={spotifyLogo} alt="Spotify logo" className="nav-logo" title="Spotify" />
                    <div className="home-icon"><img src={homeLogo} alt="Home" title="Home" /></div>
                    <div className="search-bar"><img src={searchIcon} alt="Search" className="search-icon" title="Search" />
                        <input type="text" placeholder="What do you want to play?" />
                        <div className="search-divider"></div><img src={libraryIcon} alt="Library" className="library-icon" title="Browse" />
                    </div>
                </div>
                <div className="nav-right">
                    <a href="#">Premium</a>
                    <a href="#">Support</a>
                    <a href="#">Download</a>
                    <span className="divider"></span>
                    <a href="#">Install App</a>
                    <Link to="/SignUp">Sign up</Link>
                    <Link to="/Login" className="login-bttn">Log in</Link>
                </div>
            </nav>
            <div className="landing-body">
                <div className="main-layout">
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <h2>Your Library</h2>
                            <button className="create-btn">
                                <img src={plusLogo} alt="Add" />
                                <span>Create</span>
                            </button>
                        </div>
                        <div className="sidebar-content">
                            <div className="sidebar-card">
                                <h3>Create your first playlist</h3>
                                <p>It's easy, we'll help you</p>
                                <button>Create playlist</button>
                            </div>
                            <div className="sidebar-card">
                                <h3>Let's find some podcasts to follow</h3>
                                <p>We'll keep you updated on new episodes</p>
                                <button>Browse podcasts</button>
                            </div>
                        </div>
                        <div className="sidebar-footer">
                            <div className="footer-links">
                                <a href="https://www.spotify.com/in-en/legal/end-user-agreement/">Legal</a>
                                <a href="https://www.spotify.com/in-en/safetyandprivacy">Safety & Privacy Center</a>
                                <a href="https://www.spotify.com/in-en/legal/privacy-policy/">Privacy Policy</a>
                                <a href="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</a>
                                <a href="https://www.spotify.com/in-en/legal/privacy-policy/#s3">About Ads</a>
                                <a href="https://www.spotify.com/in-en/accessibility">Accessibility</a>
                            </div>
                            <button className="language-btn"><img src={webLogo} alt="Language" className="lang-icon" />
                                <span>English</span>
                            </button>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="content-sections">
                            <section className="section">
                                <div className="section-header">
                                    <h1>Trending songs</h1>
                                    <span className="show-all">Show all</span>
                                </div>
                                <div className="card-row">
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={Luzroja} alt="Luz Roja" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>LUZ ROJA</h4>
                                        <p>bxkq</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={vocenamira} alt="Voce na mira" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>VOCE NA MIRA</h4>
                                        <p>Hwungii, DJ VGK1</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={billie_jean} alt="Billie jean" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Billie jean</h4>
                                        <p>Michael Jackson</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={TDRCAU} alt="They Don't Really Care About Us" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>They Don't Really Care About Us</h4>
                                        <p>Michael Jackson</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={HeadOfTheTable} alt="Roman Reigns-Head of the Table(Cover)" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Roman Reigns-Head of the Table(Cover)</h4>
                                        <p>Dr.Corpse</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={mortals} alt="Mortals" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Mortals</h4>
                                        <p>Warriyo, Laura Brehm</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={sajde} alt="Sajde" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Sajde</h4>
                                        <p>Faheem Abdullah, Huzaif Nazar</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={dare} alt="Dare" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Dare</h4>
                                        <p>Sayfalse, TRXVELER, DJ ALIM</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={DarkAria} alt="DARKARIA <LV2>" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>DARKARIA</h4>
                                        <p>SawanoHiroyuki[nZk], XAI</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={dreamOn} alt="Dream On" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Dream On</h4>
                                        <p>Aerosmith</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={GoldenBrown} alt="Golden Brown" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Golden Brown</h4>
                                        <p>The Stranglers</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={saopaulo} alt="Sao Paulo" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Sao Paulo</h4>
                                        <p>The Weekend, Anitta</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={slavicQueen} alt="Slavic Queen" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Slavic Queen</h4>
                                        <p>Filip Lackovic</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={ALNacer} alt="AL Nacer" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>AL NACER!</h4>
                                        <p>Sayfalse, Nulteex</p>
                                    </div>
                                    <div className="song-card">
                                        <div className="song-image">
                                            <img src={Thinkingofyou} alt="Thinking of You" className="song-cover" />
                                            <img src={playButton} alt="Play" className="play-button" />
                                        </div>
                                        <h4>Thinking of you</h4>
                                        <p>AP Dhillon</p>
                                    </div>
                                </div>
                            </section>
                            <h1>Popular artists</h1>
                            <div className="artist-row">
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={MJ} alt="Michael Jackson" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Michael Jackson</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={weekend} alt="Weekend" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Weekend</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={RaviBasrur} alt="Ravi Basrur" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Ravi Basrur</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Arijit} alt="Arijit Singh" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Arijit Singh</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Adele} alt="Adele" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Adele</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={AVA} alt="AVA MAX" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>AVA MAX</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={chrisGrey} alt="Chris Grey" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Chris Grey</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={codplay} alt="Codplay" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Codplay</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Eminem} alt="Eminem" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Eminem</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Ladygaga} alt="Lady Gaga" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Lady Gaga</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Marshmello} alt="Marshmello" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Marshmello</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={MIIA} alt="MIIA" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>MIIA</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={NCTS} alt="NCTS" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>NCTS</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Pritam} alt="Pritam" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Pritam</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={samCS} alt="Sam C.S" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Sam C.S</h4>
                                    <p>Artist</p>
                                </div>
                                <div className="artist-card">
                                    <div className="artist-image">
                                        <img src={Shreya} alt="Shreya Ghoshal" className="artist-cover" />
                                        <img src={playButton} alt="Play" className="artist-play-button" />
                                    </div>
                                    <h4>Shreya Ghoshal</h4>
                                    <p>Artist</p>
                                </div>
                            </div>
                            <h1 className="album">Popular album and singles</h1>
                            <div className="card-row">
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={Mahavatar} alt="Mahavatara Narsimha" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Mahavatara Narsimha</h4>
                                    <p>EP • Sam C. S</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={Salaar} alt="Salaar" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Salaar Pt. 1-Ceasefire (Original Background Score)</h4>
                                    <p>EP • Ravi Basrur</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={LuzRoja} alt="Luz Roja" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>LUZ ROJA</h4>
                                    <p>EP • bxkq</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={FunkCriminal} alt="Funk Criminal" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Funk Criminal</h4>
                                    <p>EP • ICEDMANE, DYSMANE</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={BringMeToLife} alt="Bring Me To Life" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Bring Me To Life</h4>
                                    <p>EP • Evanescence</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={SlavaFunk} alt="Slava Funk" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Slava Funk</h4>
                                    <p>EP • MVSTERIOUS, Hxmr, yngastrobeatz, Filip Lackovic</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={VoceNaMira} alt="Voce Na Mira" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>VOCE NA MIRA</h4>
                                    <p>EP • Hwungii, DJ VGK1</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={VaiSentar} alt="Vai Sentar" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>VAI SENTAR</h4>
                                    <p>EP • NEAR DEATH mc pl alves</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={ALNacer} alt="AL Nacer" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>AL Nacer!</h4>
                                    <p>EP • Sayfalse, Nulteex</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={CantoDeLuna} alt="Canto De Luna" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Canto De Luna</h4>
                                    <p>EP • h6itam, DYSMANE, ICEDMANE</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={GoldenBrown} alt="Golden Brown" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Golden Brown</h4>
                                    <p>EP • The Stranglers</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={Dare} alt="Dare" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Dare</h4>
                                    <p>EP • Sayfalse, TRXVELER, DJ ALIM</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={NaBatidao} alt="Na Batidao" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>Na Batidao</h4>
                                    <p>EP • ZXKAI, slxughter</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={Next} alt="Next" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>NEXT!</h4>
                                    <p>EP • NCTS</p>
                                </div>
                                <div className="album-card">
                                    <div className="album-image">
                                        <img src={PassoBemSolto} alt="Passo Bem Solto" className="album-cover" />
                                        <img src={playButton} alt="Play" className="play-button" />
                                    </div>
                                    <h4>PASSO BEM SOLTO</h4>
                                    <p>EP • ATLXS</p>
                                </div>
                            </div>
                            <h1>Popular radio</h1>
                            <div className="section-placeholder"></div>
                            <h1>Featured Charts</h1>
                            <div className="section-placeholder"></div>
                        </div>
                        <div className="main-footer">
                            <div className="footer-columns">
                                <div className="footer-column">
                                    <h4>Company</h4>
                                    <p>About</p>
                                    <p>Jobs</p>
                                    <p>For the Record</p>
                                </div>
                                <div className="footer-column">
                                    <h4>Communities</h4>
                                    <p>For Artists</p>
                                    <p>Developers</p>
                                    <p>Advertising</p>
                                    <p>Investors</p>
                                    <p>Vendors</p>
                                </div>
                                <div className="footer-column">
                                    <h4>Useful links</h4>
                                    <p>Support</p>
                                    <p>Free Mobile App</p>
                                    <p>Popular by Country</p>
                                    <p>Import your music</p>
                                </div>
                                <div className="footer-column">
                                    <h4>Spotify Plans</h4>
                                    <p>Premium Lite</p>
                                    <p>Premium Standard</p>
                                    <p>Premium Platinum</p>
                                    <p>Premium Student</p>
                                    <p>Spotify Free</p>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer">
                            <p>© 2026 Spotify AB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-banner">
                <div className="banner-content">
                    <div className="banner-text">
                        <p className="small-text">Preview of Spotify</p>
                        <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
                    </div>
                    <Link to="/SignUp" className="banner-btn">Sign up free</Link>
                </div>
            </div>
        </div>
    );
}

export default landingPage;
