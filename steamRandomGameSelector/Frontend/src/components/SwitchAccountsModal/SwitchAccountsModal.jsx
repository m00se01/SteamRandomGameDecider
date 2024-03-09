import ReactModal from "react-modal";

export const SwitchAccountsModal = (props) => {
  return (
    <>
      <ReactModal
        className={"Modal"}
        overlayClassName={"Overlay"}
        contentLabel={"Confirmation Modal"}
        shouldCloseOnEsc={true}
        isOpen={props.isOpen}
      >
        <h1>Switch Accounts</h1>

        <form>
          <label htmlFor="switchAccount">Enter Your Steamid:</label>
          <input id="switchAccount" name="switchAccount" type="text" />
        </form>

        <button onClick={props.toggleModal}>Close</button>
      </ReactModal>
    </>
  );
};
