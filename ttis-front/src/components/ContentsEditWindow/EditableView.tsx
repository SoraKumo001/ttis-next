export const HtmlEditableView = () => {
  return (
    <>
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="root" contentEditable="true"></div>
    </>
  );
};
