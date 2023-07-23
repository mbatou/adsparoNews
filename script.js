const cube = document.getElementById('cube');
  const faces = Array.from(document.querySelectorAll('.cube__face'));
  let rotation = 0;
  let startX = null;
  let currentX = null;

  cube.addEventListener('click', rotateCube);
  cube.addEventListener('mousedown', startDrag);
  cube.addEventListener('mousemove', drag);
  cube.addEventListener('mouseup', endDrag);
  cube.addEventListener('touchstart', startDrag);
  cube.addEventListener('touchmove', drag);
  cube.addEventListener('touchend', endDrag);

  function rotateCube() {
    rotation += 90;
    cube.style.transform = `rotateY(${rotation}deg)`;
  }

  function startDrag(event) {
    startX = getDragX(event);
  }

  function drag(event) {
    if (startX === null) {
      return;
    }

    currentX = getDragX(event);
    const diffX = currentX - startX;
    const sensitivity = 0.9; // Adjust this value to control the drag sensitivity
    rotation += diffX * sensitivity;
    cube.style.transform = `rotateY(${rotation}deg)`;

    startX = currentX;
  }

  function endDrag() {
    startX = null;
  }

  function getDragX(event) {
    return event.clientX || event.touches[0].clientX;
  }

  // Infinite rotation
  function autoRotate() {
    rotation += 0.5; // Adjust this value to control the rotation speed
    cube.style.transform = `rotateY(${rotation}deg)`;
    requestAnimationFrame(autoRotate);
  }

  autoRotate();