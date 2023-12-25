import React from 'react'

export class CommentContainer extends React.Component {
    state = {
        likeCount: false,
        like: Math.floor(Math.random()*100)
    }

    handleLikesChange = () => {
        if (!this.state.likeCount) {
            this.setState({
                likeCount: !this.state.likeCount, 
                like: this.state.like+1
            })
        } else {
            this.setState({
                likeCount: !this.state.likeCount,
                like: this.state.like-1
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
                            {this.props.date} at {this.props.time}
                        </span>
                    </div>

                    <div className='text'>{this.props.text}</div>

                    <div class="ui labeled button" tabindex="0">
                        <div class={"ui " + (this.state.likeCount ? "blue button" : "blue basic button")} onClick={this.handleLikesChange}>
                            <i class="heart icon"></i> Like
                        </div>
                        <a class="ui basic blue left pointing label">
                            {this.state.like}
                        </a>
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