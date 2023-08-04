// function to delete post by id
const deletePostHandler = async (event) => {
    event.preventDefault();

    // TODO: figure out how were pulling in id of blogpost to delete
    const postId = document.querySelector('#').value.trim();

    var deleteConfirm = confirm('Are you sure you want to delete this post?');
    if (deleteConfirm === false) {
        return;
    } else {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
            body: JSON.stringify({ postId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete post.');
        }
    }
};

document
    .querySelector('#deletepost-button')
    .addEventListener('submit', deletePostHandler);