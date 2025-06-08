# User Stories

[Link to Miro](https://miro.com/app/board/uXjVI-UbQ1E=/?share_link_id=636988946)

To guide our design and development process, we created a set of user stories that reflect the goals and motivations of our primary users. These stories helped us envision how different types of users would interact with **Campus Swipe** and what features would be most valuable to them.

![Screenshot of user stories on Miro](/specs/assets/userStories.png)

## For Student Organizations

**1. Event Visibility**  
_As a student leader in a campus organization,_  
I want to quickly and easily post my event on a centralized platform,  
so that more students outside of my usual circles can discover it and attend.

**2. Customizable Event Posts**  
_As a student organizing an event,_  
I want to tag my event with categories and share images and details,  
so that it stands out to students browsing and reaches the right audience.

## For Students Attending Events

**3. Event Discovery**  
_As a busy student looking to make the most of my campus experience,_  
I want to easily discover and organize events that match my interests and schedule,  
so that I can stay involved without feeling overwhelmed or missing out.

# New Features and Improvements

Throughout the development of **Campus Swipe**, we actively tracked issues and features using GitHub Issues. These improvements focused on both functionality and user experience, ensuring the app remains user-friendly, responsive, and engaging.

Below is a summary of the key features we implemented using user stories:

## UI/UX Improvements

- **Consistent Text on Add Event Page**  
  _As a user, I want consistent naming and terminology used in order to have a good and straightforward user experience._  
  → We unified form labels, buttons, and placeholder text to maintain clarity and reduce confusion.
  <br>
  → [#136](https://github.com/cse110-sp25-group11/card-game/issues/136)

- **Homepage Card Counter**  
  _As a student, I want to know how many total cards are available and how many are left in order to navigate the site more efficiently._  
  → A live counter (e.g. "3/10 cards") was added to show users how many event cards remain to swipe through.
  <br>
  → [#121](https://github.com/cse110-sp25-group11/card-game/issues/121)

- **Tagline and Logo Description**  
  _I want to be able to tell what the website does as soon as I open it._  
  → A short description was added next to the logo to explain the app’s purpose, especially for new users.  
  → [#115](https://github.com/cse110-sp25-group11/card-game/issues/115)

- **Responsive Navbar and Layout**  
  _I also want to be able to use this website on my phone without it breaking._  
  → We updated the navigation and layout to work smoothly across all screen sizes, improving mobile usability.
  <br>
  → [#118](https://github.com/cse110-sp25-group11/card-game/issues/118)

## Site Enhancements

- **Favicon Added**  
  _As a user, I want an icon at the top of the tab so that I can easily identify which tab the website is currently on._  
  → We added a custom favicon to make the app easily recognizable among multiple open tabs.
  <br>
  → [#132](https://github.com/cse110-sp25-group11/card-game/issues/132)

- **Hide Past Events Button**  
  _I don’t want to see past events since they are already done. I only want to see them when needed._  
  → A toggle button was added to filter out past events, decluttering the interface and improving relevance.
  <br>
  → [#122](https://github.com/cse110-sp25-group11/card-game/issues/122)

- **Local Storage Initialization**  
  _I want to be able to see all the events that are going to be on the website once it is completely finished._  
  → We preloaded event data into local storage to allow users to interact with events right away, even before database integration.
  <br>
  → [#110](https://github.com/cse110-sp25-group11/card-game/issues/110)

## Accessibility and Visual Polish

- **Fixes Based on Office Hours Feedback**  
  _As a user, I must be able to understand what the app does and what each button does, in order to improve user experience and reduce the learning curve._  
  → Several key updates were made:

    - Updated icons and color scheme for better visibility
    - Clearer button labels (e.g., “Submit” → “Add Event”)
    - Improved placeholder text in forms
    - Added the UCSD logo and tagline on the main page

                    → [#115](https://github.com/cse110-sp25-group11/card-game/issues/115)

---

# Conclusion

These incremental improvements were essential to making **Campus Swipe** more intuitive, accessible, and enjoyable for both students and event organizers.
