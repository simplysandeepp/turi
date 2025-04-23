// Example: Load More Posts
const blogContainer = document.querySelector('.blog-container');
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load More';
loadMoreButton.className = 'load-more-button';
document.querySelector('.blog').appendChild(loadMoreButton);

// Dummy Data for Additional Posts
const additionalPosts = [
    {
        image: 'https://via.placeholder.com/400x250',
        title: 'The Power of Now',
        date: 'September 15, 2023',
        excerpt: 'Learn how living in the present moment can transform your life.',
    },
    {
        image: 'https://via.placeholder.com/400x250',
        title: 'Yoga and Consciousness',
        date: 'September 10, 2023',
        excerpt: 'Explore the connection between yoga practices and higher states of consciousness.',
    },
];

// Function to Add More Posts
loadMoreButton.addEventListener('click', () => {
    additionalPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <h3>${post.title}</h3>
                <p class="blog-date">Published on: ${post.date}</p>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });

    loadMoreButton.remove(); // Remove the button after loading posts
});