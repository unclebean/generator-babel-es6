var React = require('react');

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                    <h2>Main Container</h2>
                </div>
                {this.props.children}
            </div>
        )
    }
})

module.exports = Main;