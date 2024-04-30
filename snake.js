// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the size of each cell and the number of cells in the grid
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// Initialize the snake
let snake = [{ x: 10, y: 10 }]; // Snake starts at position (10,10)
let dx = 0; // Initial movement direction
let dy = 0;
let food = generateFood(); // Generate initial food position

// Function to generate random position for food
function generateFood() {
    return {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };
}

// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "white";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Function to update the snake's position
function update() {
    // Update snake's position based on movement direction
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for collision with walls or itself
    if (
        head.x < 0 ||
        head.x >= gridWidth ||
        head.y < 0 ||
        head.y >= gridHeight ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        // End the game
        // alert("Game Over!");
        //resetGame();
        // return;
    }

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        // Increase snake length and generate new food
        snake.unshift(head);
        food = generateFood();
    } else {
        // Move the snake by adding the new head and removing the tail
        snake.unshift(head);
        snake.pop();
    }
}

// Function to reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    food = generateFood();
}

// Function to handle key presses for controlling the snake
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (dy !== 1) { // Prevent the snake from reversing into itself
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

// Main game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game state
    update();

    // Draw everything
    drawSnake();
    drawFood();

    // Call the next frame with a delay
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 100); // Adjust the delay time (in milliseconds) to control the game speed
}

// Start the game loop
gameLoop();
// Function to draw the length counter
function drawLengthCounter() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Length: " + snake.length, canvas.width - 10, 30);
}

// Main game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game state
    update();

    // Draw everything
    drawSnake();
    drawFood();
    drawLengthCounter(); // Draw the length counter

    // Call the next frame with a delay
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 100); // Adjust the delay time (in milliseconds) to control the game speed
}
