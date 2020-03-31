import Link from "next/link";

export default () => (
  <>
    <style jsx>{`
      .link {
        display: block;
      }
    `}</style>
    <div>
      <Link  href="?userList">
        <a className="link">UserList</a>
      </Link>
      <Link href="?login">
        <a className="link">Login</a>
      </Link>
    </div>
  </>
);
