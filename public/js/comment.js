const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const post_id = event.target.getAttribute("data-id");
    const text = document.querySelector("#text").value.trim();
  
    if (text && post_id) {
      try {
        const response = await fetch(`/api/comments/`, {
          method: "POST",
          body: JSON.stringify({ text, post_id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const updatedPost = await response.json(); // Parse the response JSON
          console.log("Updated Post:", updatedPost);
          document.location.replace("/profile");
        } else {
          alert(`Failed to comment`);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("Failed to comment. Please try again.");
      }
    } else {
      alert("Name and description are required.");
    }
  };
  
  const delCommentButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/comment");
      } else {
        alert("Failed to delete comment");
      }
    }
  };

  document
  .querySelector(".edit-post-form").addEventListener("submit", newCommentHandler);

  document
  .querySelector(".post-list")
  .addEventListener("click", delCommentButtonHandler);