# What's Next

Because CSE 110 is only a quarter long course, we understood from the beginning that we wouldn’t have time to perfect or fully fledge out every feature of our app. The short timeline required us to prioritize core functionality and rapidly iterate based on user feedback through short sprints.

While we've made good progress with **Campus Swipe**, there are still many features and improvements we would pursue if we simply had more time.

## Future Improvements and Features

### 1. Database and Backend Integration
Currently, event data is stored in local storage. A key next step is to implement a full backend and database system so that:
- Users can create persistent accounts
- Events are stored and shared across sessions and devices
- Student orgs can track engagement metrics

### 2. User Authentication
We plan to add login functionality so that users can:
- Save favorite events to their profile
- Post and manage their own events (for clubs/orgs)
- Receive recommendations based on past activity

### 3. Interactive Event Cards
In the beginning of the design process, we wanted this feature, but because of the time constraint we had to priortize other functionailtes.
Right now, the event cards are not clickable. We want to make them interactive so that:
- Users can click on a card (in the **Browse** page or **Liked Events**) to view more detailed information about the event

### 4. Swipe Gesture Functionality
Currently, the swiping interaction is handled by "Yes" and "No" buttons. In the future, we want to support actual **swipe gestures** so users can:
- Physically swipe left or right on a card
- Have a more engaging and intuitive experience on mobile and touch-enabled devices

### 5. Calendar Integration
We received feedback from our google form survey, requesting the ability to view events on a calendar and sync with external tools like Google Calendar. This would make the app more practical for students managing busy schedules.

### 6. Notifications and Reminders
Future versions could include push/email notifications or reminders for events users have swiped right on, to help drive attendance.

### 7. Improved Filtering and Search
Adding filters (such as category, date, and location) and a search bar would make it easier for students to find specific types of events.

### 8. Accessibility and UI Polish
Although we made accessibility improvements during development, there’s always more work to be done. We would continue refining contrast, mobile responsiveness, and overall visual design.

Some things we need to also keep in mind: 
- **Full responsiveness across devices**: Currently, the **Browse** page layout is not fully optimized for mobile and appears janky on smaller screens. We want to address this to ensure smooth usage on phones and tablets.
- **Cross-browser compatibility**: We will test and adjust the app to work consistently across all major browsers including Chrome, Firefox, Safari, and Edge.

## Final Thoughts

Building and making Campus Swipe from scratch over a single quarter challenged us to focus on the essentials: rapid prototyping, user-centered design, and collaborative iteration. Given more time, the features outlined above would not only extend the app’s functionality but also directly support some of the many key software engineering "-ilities" taught in this course.

  - **Scalability**: Adding backend support and a persistent database would allow the app to scale to more users, more events, and more organizations while maintaining performance across sessions and devices.

  - **Usability**: Features like swipe gestures, calendar integration, and detailed event cards directly improve the user experience, making the app more intuitive and engaging, especially on mobile devices.

  - **Maintainability**: By improving search, filters, and adjustable components (like interactive cards), we make the codebase easier to update and extend as new needs arise.

  - **Accessibility**: Continued focus on contrast, responsiveness, and inclusive design aligns with the broader goal of creating an app usable by all students, regardless of ability or device.

  - **Reliability**: Introducing authentication and event reminders would ensure that users can depend on the app for accurate, consistent behavior, whether it's saving favorites or receiving timely alerts.

  - **Portability**: Enhancing cross browser compatibility and device responsiveness ensures the app is usable across a wide range of environments without platform specific issues.

  - **Extensibility**: Features like event tracking, recommendations, and notifications pave the way for future integrations,whether with analytics tools or third-party services like Google Calendar.

The team's experience with Campus Swipe was a meaningful introduction to real world software design. While our "final version" met key requirements, this roadmap reflects our shared understanding that good software is never truly finished, it just gets better with each thoughtful iteration.