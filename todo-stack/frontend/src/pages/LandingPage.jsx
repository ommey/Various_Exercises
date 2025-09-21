import { ThemeToggleButton } from '../ThemeHandler';
import './LandingPage.css'


export function LandingPage(themeToggler={ThemeToggleButton}) {

    return (
        <div className="landing-page-background">
            <title>LandingPage</title>
            
                <div className="first"></div>
                <div className="second"></div>
                <div className="fourth"></div>
                <div className="fifth"></div>
                <ThemeToggleButton />
            
            LandingPage, overview and starting location
        </div>
    );
}