import React, { Component } from 'react';
import { ImagePicker, WingBlank } from 'antd-mobile';

class AvatarSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
        }
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        })
        let file = files.length ? files[0].file : {};
        // let data = new FormData();
        // data.append('file', file)
        this.props.getFiles(file)
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        selectable={this.state.files.length < 1}
                        multiple={false}
                        length={1}
                    />
                </WingBlank>
            </div>
        )
    }
}

export default AvatarSelector