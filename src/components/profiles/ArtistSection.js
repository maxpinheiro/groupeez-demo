import React from 'react';
import {connect} from 'react-redux';
import artistService from "../../services/ArtistService";
import listenerService from "../../services/ListenerService";
import {Link} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import PostService from "../../services/PostService";
import SongService from "../../services/SongService";

class Artist extends React.Component {
    state = {
        artist:{
                id: "",
                username: "",
                name: "",
                profileId: "",
                spotifyId: "",
                bio: "",
                library: [],
                reviews: [],
                posts: [],
                followers: []
            },


    };

    componentDidMount() {
        const artistId = this.props.artistId;
        if (artistId.length > 10) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {
                        // search spotify API
                    }
                })
        } else {
            artistService.findArtistById(artistId)
                .then(artist => {
                    if (!artist.error) {
                        const newArtist = this.populateArtist(artist);
                        this.setState(function(prevState){
                            return {
                                ...prevState,
                                artist: newArtist,
                            }
                        })
                    }
                })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const artistId = this.props.artistId;
        if (artistId.length > 10) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {
                        // search spotify API
                    }
                })
        } else if (artistId !== prevProps.artistId) {
            artistService.findArtistById(artistId)
                .then(artist => {
                    if (!artist.error) {
                        const newArtist = this.populateArtist(artist);
                        this.setState(function(prevState){
                            return {
                                ...prevState,
                                artist: newArtist,
                            }
                        })
                    }
                })
        }
    }

    populateArtist = (old) => {

        Promise.all(old.reviews.map(reviewId =>
            reviewService.findReviewById(reviewId)
        )).then(reviews => {
            Promise.all(old.library.map(songId =>
                songService.findSongById(songId)
            )).then(songs => {
                Promise.all(old.posts.map(postId =>
                    postService.findPostById(postId)
                )).then(posts => {
                    Promise.all(old.followers.map(groupeeId =>
                        listenerService.findListenerById(groupeeId)
                    )).then(groupeez => {
                        return {...old,
                        reviews: reviews,
                        posts: posts,
                        followers: groupeez,
                        library: songs
                        }
                    });
                });
            });
        });

    }


    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">

                <div className={"h1"}>
                    {this.state.artist.name}
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div style={{width: 100, height: 100}}>
                            <img src={this.state.artist.profileUrl} alt={"img"} className={"img-thumbnail"} />
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"boarder m-2"}>
                            <div className={"h4"}>Bio</div>
                            {this.state.artist.bio}
                        </div>
                    </div>
                </div>

                <div className={"row boarder"}>
                    <div className={"h4 m-2"}>
                        Posts
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.artist.posts.map(post =>
                                <div key={post.id}
                                     className={"list-item"}>
                                    <div className={"h5"}>
                                        {post.type}
                                    </div>
                                    <div className={"float-left h6"}>
                                        <Link to={`/details/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"row m-2 boarder"}>
                    <div className={"h4 m-2"}>
                        Library
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.songs.map(song =>
                                <div key={song.id}
                                     className={"list-item"}>
                                    <div className={"float-left"}>
                                        <Link to={`/details/songs/${song.id}`}>
                                            {song.title}
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"row m-2 boarder"}>
                    <div className={"h4 m-2"}>
                        Reviews
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.reviews.map(review =>
                                <div key={review.id}
                                     className={"list-item"}>
                                    <div className={"float-left"}>
                                        <Link to={`/details/reviews/${review.id}`}>
                                            {review.title}
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    this.props.private &&
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"h4 m-2"}>
                                Following
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.artist.groupeez.map(groupee =>
                                        <div key={groupee.id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/profile/${groupee.id}`}>
                                                    {groupee.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    //cookies: ownProps.cookies

})

const propertyToDispatchMapper = (dispatch) => ({
})

const ArtistSection = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistSection;