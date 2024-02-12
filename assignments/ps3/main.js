const thumbnails = document.querySelector("div#thumbnails");

let index = 0;
let timerId = false;

getUMEventsWithImages(events => {
    for(const event of events){
        const img = document.createElement("img");
        img.setAttribute("src", event.styled_images.event_thumb);
        thumbnails.append(img);


        img.addEventListener('click', (ev) => {
            clearTimeout(timerId);
            thumbnails.querySelector('.selected').classList.remove('selected');
            ev.target.classList.add('selected');
            tarIdx = Array.from(thumbnails.children).indexOf(ev.target);
            getEventDescription(tarIdx);
            setSelectedIndex(tarIdx);
            timerId = setTimeout(selectImage, 10000);
        });
    }


    function selectImage(){
        const selected = document.querySelector(".selected");
        if (selected){
            selected.classList.remove("selected");
        }
        const img = thumbnails.children[index];
        img.classList.add("selected");
        getEventDescription(index);
        setSelectedIndex(index);
        timerId = setTimeout(selectImage, 10000);
    }
    

    function setSelectedIndex(i) {
        if (i === thumbnails.children.length - 1){
            index = 0;
        }
        else{
            index = i + 1
        }
    };


    function getEventDescription (index){
        const selectedTitle = document.querySelector("#selected-title");
        const title = events[index].event_title;
        selectedTitle.innerText = title;
        selectedTitle.setAttribute("href", events[index].permalink);

        const selectedImage = document.querySelector("#selected-image");
        const image = events[index].image_url;
        selectedImage.setAttribute("src", image);

        const selectedDate = document.querySelector("#selected-date");
        let date = events[index].datetime_start;
        date = getReadableTime(date);
        selectedDate.innerText = date;
        
        const selectedDescription = document.querySelector("#selected-description");
        desc = events[index].description;
        selectedDescription.innerText = desc;
    }

    selectImage();

});