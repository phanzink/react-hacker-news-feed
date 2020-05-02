import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import moment from 'moment';

class Story extends PureComponent {
    static propTypes = {
        title: propTypes.string,
        time: propTypes.number,
        url: propTypes.string,
        by: propTypes.string,
        uniq: propTypes.string,
        style: propTypes.object,
    }

    convertTime (time) {
        let date = moment.unix(time);
        return date.format("MM-DD-YYYY, HH:mm:ss");
    }

    render() { 
        const { title, time, url, by, uniq, style } = this.props;
        return (
            <article className="story" key={ uniq } style={ style }>
                <h5>
                    { title }<br />
                    { by && <span>by: { by }</span> }
                </h5>
                <div className="date">
                    published on: { this.convertTime(time) } 
                    { url && <div className="goto">
                    <a href={ url } rel="noopener noreferrer" target="_blank"><img src="https://img.icons8.com/material-rounded/24/000000/external-link.png" alt="new window"/></a></div> }
                </div>
            </article>
        );
    }
}
 
export default Story;