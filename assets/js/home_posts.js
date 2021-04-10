{
    // method to submit the form data for new post using AJAX 
    let createPost = function () {
        let newPostFrom = $('#new-post-form');
        newPostFrom.submit(function (e) {
            // so that it doesnt post and reload page 
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostFrom.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
    
          
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}>">Delete Post</a>
            </small>
            <h3>${post.content}</h3>
            <br>
            <small>
            -${post.user.name}
            </small>
        </p>
    
        <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Comment">
            </form>
    
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
            
                            </ul>
                        </div>
                    </div>
                </li>
                `)
    }

    createPost();
}