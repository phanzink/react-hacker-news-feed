import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class About extends PureComponent {
    static propTypes = {
        why: PropTypes.string,
    };

    render() { 
        return (
            <div className="container about-page">
                <h1>About</h1>
                <p>
                    Look at hacker news stories in slightly off white.
                </p>
                <p><strong>Features</strong> I would love to add: A dark mode, viturlized list, and memoization
                    the story component to make it less taxing on browsers. I would also spend a ton more
                    time on styling. Im not sure thrilled with it. Add font awesome to make the style a little
                    more pleasent, also make the site more responsive. Back to top button would be nice, and 
                    I think lastly a way to get new stories loaded in.
                </p>
            </div>
        );
    }
}
 
export default About;