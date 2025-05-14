import advanced from "../assets/images/icon-advanced.svg"
import arcade from "../assets/images/icon-arcade.svg"
import checkmark from "../assets/images/icon-checkmark.svg"
import pro from "../assets/images/icon-pro.svg"
import thank from "../assets/images/icon-thank-you.svg"


export const formSteps = [
  {
    id: 0,
    step: "STEP 1",
    text: "YOUR INFO",
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
    inputs: [
      { type: "text", placeholder: "e.g. Stephen King", label: "Name", name: "name" },
      { type: "email", placeholder: "e.g.stephenkin@lorem.com", label: "Email Address", name: "email" },
      { type: "tel", placeholder: "e.g. +1 234 567 890", label: "Phone Number", name:"phone" }
    ]
  },
  {
    id: 1,
    step: "STEP 2",
    text: "SELECT PLAN",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    buttons: [
      { icon: arcade, title: "Arcade", price: "$9/mo", valor: 9, anualPrice: "$90/yr", monthsFree: "2 months free" },
      { icon: advanced, title: "Advanced", price: "$12/mo", valor: 12, anualPrice:"$120/yr", monthsFree:"2 months free" },
      { icon: pro, title: "Pro", price: "$15/mo",valor: 15, anualPrice:"$150/yr", monthsFree: "2 months free" }
    ]
  },
  {
    id: 2,
    step: "STEP 3",
    text: "ADD-ONS",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    checkboxes: [
      { label: "Online service", description: "Access to multiplayer games", price: "+$1/mo", valor: 1, anualPrice: "+$10/yr" },
      { label: "Larger storage", description: "Extra 1TB of cloud save", price: "+$2/mo", valor: 2, anualPrice:"+$20/yr" },
      { label: "Customizable profile", description: "Custom theme on your profile", price: "+$2/mo", valor: 2, anualPrice: "+$20/yr" }
    ]
  },
  {
    id: 3,
    step: "STEP 4",
    text: "SUMMARY",
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming."
  }
];