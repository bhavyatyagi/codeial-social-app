{let e=function(){let e=$("#new-post-form");e.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(e){let o=t(e.data.post);$("#posts-list-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(e.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post Created!",type:"success",layout:"topCenter",timeout:1500}).show()},error:function(e){new Noty({theme:"relax",text:"Error creating Post...",type:"error",layout:"topCenter",timeout:1500}).show(),console.log(e.responseText)}})}))},t=function(e){return $(`<li id="post-${e._id}">\n                    <p>\n                        <h3>\n                            ${e.content}\n                        </h3>\n                        \n                            -${e.user.name}\n                            <small>\n                            \n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Post">\n                                    0 Likes\n                                </a>\n                            \n                        </small>\n                        <small>\n                            <a class="delete-post-button"  href="/posts/destroy/${e._id}">Delete Post</a>\n                        </small>\n                       \n                    </p>\n                    <div class="post-comments">\n                        \n                            <form action="/comments/create" method="POST">\n                                <input type="text" name="content" placeholder="Type Here to add comment..." required>\n                                <input type="hidden" name="post" value="${e._id}" >\n                                <input type="submit" value="Add Comment">\n                            </form>\n               \n                \n                        <div class="post-comments-list">\n                            <ul id="post-comments-${e._id}">\n                                \n                            </ul>\n                        </div>\n                    </div>\n                    \n                </li>`)},n=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){new Noty({theme:"relax",text:"Post Deleted!",type:"error",layout:"topCenter",timeout:1500}).show(),$("#post-"+e.data.post_id).remove()},error:function(e){console.log(e.responseText)}})}))};e()}