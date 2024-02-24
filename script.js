document.addEventListener('DOMContentLoaded', function() {
    var arr = [
        {songName: "Gajanana", url: "Gajanan.mp3", img: "1.jpg", id: "1",duration:"4:02"},
        {songName: "Shambu Sutaya", url: "Shambhu Sutaya (From ABCD - Any Body Can Dance).mp3", img: "2.jpg", id: "2",duration:"2:03"},
        {songName: "Parvati Boli Shankar Se", url: "Parvati Boli Shankar Se.mp3", img: "3.jpg", id: "3",duration:"7:30"},
        {songName: "Shiv Shankar ko jisne puja", url: "Shiv Shankar Ko Jisne Pooja.mp3", img: "4.jpg", id: "4", duration:"6:07"},
    ];
    var rightElement = document.querySelector('#right');
    var left = document.querySelector('#left');
    var audio = new Audio();
    var play = document.querySelector("#play")
    var backward = document.querySelector("#backward")
    var forward = document.querySelector("#forward")
    var selectedSong = 1; // Start from 1
    var flag = 0;

    function main(){
        var data = "";
        arr.forEach(function(elem) {
            data += `
                <div class="song" id="${elem.id}">
                    <img src="${elem.img}" alt="${elem.songName}" />
                    <h2>${elem.songName}</h2>
                    <h3>${elem.duration}</h3>
                </div>`;
        });

        if (rightElement) {
            rightElement.innerHTML = data;
        } else {
            console.error("Element with id 'right' not found.");
        }
        audio.src = arr[selectedSong - 1].url; // Adjust index to start from 0
        left.style.backgroundImage = `url(${arr[selectedSong-1].img})`
    }

    main();

    rightElement.addEventListener("click", function (dets) {
        var clickedElement = dets.target.closest('.song');
        if (!clickedElement) return;

        selectedSong = parseInt(clickedElement.id); // Parse the ID to integer
        main();
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        flag = 1;
        audio.play();
    });

    play.addEventListener("click", function () {
        if (flag == 0) {
            flag = 1;
            play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
            main();
            audio.play();
        } else {
            flag = 0;
            play.innerHTML = `<i class="ri-play-mini-fill"></i>`;
            main();
            audio.pause();
        }
    });
    
    forward.addEventListener("click", function () {
        if (selectedSong < arr.length) {
            selectedSong++;
            main();
            audio.play();
            backward.style.opacity = 1; // Reset opacity
        } else {
            forward.style.opacity = 0.4;
        }
    });

    backward.addEventListener("click", function () {
        if (selectedSong > 1) {
            selectedSong--;
            main();
            audio.play();
            forward.style.opacity = 1; // Reset opacity
        } else {
            backward.style.opacity = 0.4;
        }
    });
});
