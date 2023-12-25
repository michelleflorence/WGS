import React from 'react'

export class CommentContainer extends React.Component {
    state = {
        likeCount: 0,
    }

    handleLikesChange = () => {
        if (this.state.likeCount < 0) {
            this.setState({
                likeCount: 0
            })
        } else {
            this.setState({
                likeCount: this.state.likeCount + 1
            })
        }
    }

    handleDislikesChange = () => {
        if (this.state.likeCount <= 0) {
            this.setState({
                likeCount: 0
            })
        } else {
            this.setState({
                likeCount: this.state.likeCount - 1
            })
        }
    }

    render() {
        return (
            <div className='comment'>
                <a href='/' className='avatar'>
                    <img alt='avatar' src={this.props.avatar}/>
                </a>
                <div className='content'>
                    <a href='/' className='author'>
                        {this.props.name}
                    </a>

                    <div className='metadata'>
                        <span className='date'>
                            {this.props.date} at {this.props.time} | Liked: {this.state.likeCount}
                        </span>
                    </div>

                    <div className='text'>{this.props.text}</div>

                    <div class="ui labeled button" tabindex="0" onClick={this.handleLikesChange}>
                        <div class="mini ui basic red button">
                            <i class="heart icon"></i> Like
                        </div>
                    </div>
                    <div class="ui labeled button" tabindex="0" onClick={this.handleDislikesChange}>
                        <div class="mini ui basic blue button">
                            <i class="thumbs down icon"></i> Dislike
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }
    
    render() {
        return (
            <div className='ui container comments'>
                {this.props.comments.map((comment, index) => (
                    <CommentContainer
                        key = {index}
                        avatar = {comment.avatar}
                        name = {comment.name}
                        date = {comment.date}
                        time = {comment.time}
                        text = {comment.text}
                    />
                ))}
            </div>
        )
    }
}

// const Comments = () => {
//     let comments = [];
//     // const name = faker.person.fullName();
//     // const avatar = faker.image.avatar();
//     // const date = faker.date.recent().toLocaleDateString();
//     // const comment = faker.lorem.text();

//     for (let i=0; i<10; i++) {
//         const comment = {
//             name: faker.person.fullName(),
//             avatar: faker.image.url(),
//             date: faker.date.recent().toLocaleDateString(),
//             text: faker.lorem.text()
//         }
//         comments.push(comment)
//     }
//   return (
//     <div className='ui container comments'>
//         {comments.map((comment) => (
            // <div className='comment'>
            //     <a href='/' className='avatar'>
            //         <img src={comment.avatar}></img>
            //     </a>
            //     <div className='content'>
            //         <a href='/' className='author'>
            //             {comment.name}
            //         </a>

            //         <div className='metadata'>
            //             <span className='date'>{comment.date}</span>
            //         </div>

            //         <div className='text'>{comment.text}</div>
            //     </div>
            // </div>
//         ))}
//     </div>
//   )
// }