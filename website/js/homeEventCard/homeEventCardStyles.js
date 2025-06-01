export const styles = `
    /** TODO: INSERT CSS FOR HOME EVENT CARD HERE **/

    .home-event-card {
        background-color: white;
        outline: 2px solid #c69214f2;
        outline-offset: 4px;
        border-radius: 8px;
        width: 500px;
        box-sizing: border-box;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    .home-event-card:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 20px rgba(198, 146, 20, 0.4);
    }

    img{
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    
    .name-and-org {
        margin-bottom: 30px;
    }
    .event-name {
        display: block;
        font-size: 40px;
        font-weight: 1000;
        font-family: "Merriweather Sans", sans-serif;
        color: #182B49;
        margin-bottom: 8px;
        padding-left: 30px;
        padding-top: 30px;
    }

    .org-name {
        display: block;
        font-size: 35px;
        font-weight: 700;
        font-family: "Merriweather Sans", sans-serif;
        color: #C69214;
        padding-left: 30px;
    }

    .info-section {
        padding: 0 30px 30px 30px;
        font-family: "Merriweather Sans", sans-serif;
        font-weight: 300;
        letter-spacing: 1px;
    }

    .date-time-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .event-time {
        margin: 0;
        padding-bottom: 10px;
        color: #182B49
    }

    .event-time-range {
        white-space: nowrap;
    }

    .event-location,
    .food-status,
    .event-description {
    color: #182B49;
}
`;
