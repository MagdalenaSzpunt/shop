import React from 'react'

class Main extends React.Component {
    render() {
        return <div>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                className="embed-responsive-item"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/RLsNCKC6sL0"
                frameborder="0"
                allowFullScreen>
                </iframe>
            </div>
        </div>
    }
}

export default Main
