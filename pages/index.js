import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const validEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i);

  // State variables
  const [email, setEmail] = useState("");
  const [emailArray, setEmailArray] = useState([]);
  const [emailErr, setEmailErr] = useState(false);
  const [emailDouble, setEmailDouble] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleEmailStorage = (email) => {
    // Save email into an array
    const newEmail = emailArray;
    if (emailArray.includes(email)) {
      setEmailDouble(true);
      setSuccessMsg(false);
    } else {
      newEmail.push(email);
      setEmailArray(newEmail);
      // Save array as JSON
      localStorage.setItem("email", JSON.stringify(emailArray));
      console.log(emailArray);
      setEmailDouble(false);
      setSuccessMsg(true);
    }
  };

  // User clicks Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (validEmail.test(email)) {
      setEmailErr(false);
      handleEmailStorage(email);
    } else {
      setEmailErr(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Email form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Email</h1>

        <p className={styles.description}>Add your email address</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="submit" value="Submit" />
          {emailErr && (
            <p className={styles.errormsg}>
              Please enter a valid email address
            </p>
          )}

          {emailDouble && (
            <p className={styles.errormsg}>Email has already been added.</p>
          )}
          {successMsg && <p className={styles.successmsg}>Email added!</p>}
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
