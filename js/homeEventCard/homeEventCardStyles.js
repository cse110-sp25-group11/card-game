export const styles = `
    .home-event-card
    {
        /*Coloring*/
        background-color: white;
        
        /*Layout*/
        width: 500px;
        
        outline: 2px solid #c69214f2;
        outline-offset: 4px;
        border-radius: 8px;
        box-sizing: border-box;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    .home-event-card:hover
    {
        transform: scale(1.02);
        box-shadow: 0 8px 20px rgba(198, 146, 20, 0.4);
    }

    img
    {
        /*Layout*/
        width: 100%;
        height: 300px;

        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    
    .name-and-org
    {
        /*Spacing*/
        margin-bottom: 30px;
    }
        
    .event-name
    {
        /*Text*/
        font-weight: 1000;
        font-family: "Merriweather Sans", sans-serif;
        font-size: 40px;

        /*Coloring*/
        color: #182B49;
        
        /*Spacing*/
        margin-bottom: 8px;
        padding-left: 30px;
        padding-top: 30px;
        padding-right: 30px;
        
        /*Layout*/
        display: block;
    }

    .org-name
    {
        /*Text*/
        font-size: 35px;
        font-weight: 700;
        font-family: "Merriweather Sans", sans-serif;

        /*Coloring*/
        color: #C69214;

        /*Spacing*/
        padding-left: 30px;
        padding-right: 30px;

        /*Layout*/
        display: block;
    }

    .info-section
    {
        /*Text*/
        font-family: "Merriweather Sans", sans-serif;
        font-weight: 300;
        letter-spacing: 1px;

        /*Spacing*/
        padding: 0 30px 30px 30px;
    }

    .date-time-line
    {
        /*Layout*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .event-time
    {
        /*Coloring*/
        color: #182B49

        /*Spacing*/
        margin: 0;
        padding-bottom: 10px;
    }

    .event-time-range
    {
        white-space: nowrap;
    }

    .event-location,
    .food-status,
    .event-description
    {
        /*Coloring*/
        color: #182B49;
    }
`;
