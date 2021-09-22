import React from "react";

class readme extends React.Component{

render() {
return(
<div>
    <p>Store name : Sports World</p>
    <p>We are selling sports items</p>
    <p>Additional Pages(available for logged-in users only):</p>
    <ul>
        <li>My Purchases - when the user enters this page, a request is sent to the data base and then
            we represent to the user all the purchases history that he made.
        </li>
        <br/>
        <li>Products Information - A page with specific detailed information about each of the products
            that we are selling. For each product we explain th the customer it's use, for what it's good
            and all other information that the customer should know about the product.
        </li>
        <br/>
        <li>Contact Us - The logged-in user can use this page to send us his email and phone number.
            we save this information in our data base in a separate table.
        </li>
        <br/>
        <li>Delete User - its allow the user
            to delete it's profile from our website. A valid password is required before we delete
            the user from the data base.
        </li>
        <br/>
    </ul>
    <p>The things that were hard to do:
        We did all the front side of the project with React. It was difficult in the beginning
        because we didn't have experience with this technology. But we learned it by ourself and after a while
        it became really useful.
    </p>

    <p>My partner was Gil Nahum, id - 316417864.
        We did all the project together so that each of us will understand every part of it.
    </p>
    <p>
        All the different routes our app supports:
        readme, register, login, logout, store, MyPurchases, ProductsInfo, ContactUs, DeleteUser, Admin Screen.
    </p>
</div>
);
}
}
export default readme;