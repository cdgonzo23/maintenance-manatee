// function to handle editing a post
const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(`#edit-post-title`).value.trim();
    const content = document.querySelector(`#edit-post-content`).value.trim();
    const cost = document.querySelector(`#edit-post-cost`).value.trim();
    const postId = document.querySelector(`#postId`).value;

    if (title && content && cost && postId) {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content, cost, postId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to edit post.');
        }
    }
};

document
    .querySelector('#editpost-form')
    ?.addEventListener('submit', editPostFormHandler);