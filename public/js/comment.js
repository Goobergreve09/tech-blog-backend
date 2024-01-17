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
          const updatedPost = await response.json();
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
  

// const delCommentButtonHandler = async (event) => {
//     if (event.target.hasAttribute("data-id")) {
//       const commentId = event.target.getAttribute("data-id");
  
//       try {
//         const response = await fetch(`/api/comments/${commentId}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ commentId }), // Send the commentId in the request body
//         });
  
//         if (response.ok) {
//           document.location.replace("/comments");
//         } else {
//           alert("Failed to delete comment");
//         }
//       } catch (error) {
//         console.error("Error during fetch:", error);
//         alert("Failed to delete comment. Please try again.");
//       }
//     }
//   };
  

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", newCommentHandler);

// document
//   .querySelector(".comment-list")
//   .addEventListener("click", delCommentButtonHandler);
