# team03 - The Good Neighbor Project #

## URL: https://powerful-ridge-92861.herokuapp.com/

## Members ##
Ayub Hassan <br/>
Anirudha Kanodia <br/>
Yousuf Madi <br/>

## Credentials: ##
### User <br/>
__email:__ user@user.com <br/>
__password:__ user <br/>

### Admin <br/>
__email:__ admin@admin.com <br/>
__password:__ admin <br/>


## The Concept:
The pandemic has impacted communities throughout the world. But what it hasn't changed is the good hearts of the people who are willing to help those in need, especially those worst affected. This includes the elderly population and those with special needs since these groups are the ones who have the highest risk of contracting with the virus. That's where "The Good Neighbour" comes in! We can make a huge difference in people's lives with small acts of kindness such as picking up groceries, food items, essentials or even mowing the lawn!

## User Interactions:
A user can be either a Requestor or Volunteer or or Admin or all three.

### Requestor:
Let's say Ben, a 65 year old man would like to request someone to pick up groceries for him. Since he doesn't yet have an account with the website, he signs up by going the Signup page which can be accessed using the navbar on the homepage of the website. After signing up, he is redirected to the timeline.

Once in the timeline, he notices a form to create a request. Here, he can  also view requests created by other users. Since he want to create a request, he starts by entering a description of the request. Ben types "I would like someone to pick up groceries for me. Kindly deliver these groceries between 12pm-7pm". He now enters his delivery address "27 King's College Cir, Toronto". Ben now starts adding the items he would like to buy. He enters "Brown bread", "A dozen Eggs", "Kellog's rice krispies cereal", "Annie's Pasta", "Baking powder" and "Ginger ale". He then selects the type of reimburesement he will be providing to the volunteer. He selects "Cash" and submits the request.

The requests in the timeline are ordered in chronological order (older requests appear before new requests). Ben notices his request is now in the timeline (page 2). He clicks on the edit symbol by his post to edit his post because he forgot to add the most important item in his grocerly list: "A large bag of Doritos". He adds this item and clicks the check icon to update his post. Ben also has the option of deleting his post by clicking on the "delete" button on his post.

Ben is all done! He now waits for a volunteer to complete his request.

### Volunteer:
A kind 22 year old Lucy wants to help to some of her folks on our website. She is already a member and logs into the website by going to the login page of the website which is available in the navbar of the website. She logs in is taken to the timeline. 

She looks at the map in the sidebar which shows her the request closest to her. She would prefer if she is reimbursed in cash so she selects filters these requests using the filter in the Sidebar. The sidebar also enables her to filter by distance and size. Once she filters these requests, she decides to accept one by clicking on "Accept request" on the post. A confirmation pops up to confirm if she wants to accept the request. She can now view all the information about the request and proceed to complete it.

She selects the post by Ben to deliver groceries. After buying all the items, she delivers it to Ben's address and completes the request by clicking on "Request completed".


## Admin
John is an administrator of the website. He can perform the following actions:

- __View all users__: Inside the "Settings" page of the website (once logged in), John can view all the users registered with the website.
- __Delete users__: He can delete any user from the website from the settings page. 
- __Make others admin__: He can make other users an admin.
- __View app stats__: He can view statistics regarding the website by navigating to the "App Stats" tab inside Settings.
- __Delete posts__: John has the power to delete posts in the timeline by clicking on the delete button in the post.
- __View Request Items__: John has the ability to view the items in a request prior to accepting it, an ability regular volunteers do not possess. This reserves the privacy of the requestor.

Like all other users, John can create a request or volunteer and accept one.

## Sidebar
The sidebar serves as the main navigational tool once inside the website. It links to:

- __Home__: The landing page of the website.<br/>
- __Settings__: A user can edit their information by navigating to the settings page.<br/>
- __Logout__: A user can log out of the website by clicking here.<br/>

Users can also filter requests using the sidebar by:
- __Distance__
- __Size of favour__
- __Method of reimbursement__


## New features
We implemented quite a couple of new features while sticking to the original design.

1. __Google Maps__: One of the coolest features implemented is Maps which is visible in the timeline. On this dynamic map exists all the requests in a convenient view, making it easier for the volunteer to select a request to complete. Once a volunteer accepts a request to complete, the active view appears which only contains the request information about the accepted request. The Map updates to provide the location to where items need to be delivered, making it very convenient for the volunteer.
2. __Image Uploads__: Using cloudinary, we were able to allow for image uploads. When a user signs up, they are provided with a default profile image which routes to a link to cloudinary. A user can update their profile image from the settings page. Please note that only small image uploads work.

URL: https://powerful-ridge-92861.herokuapp.com/
