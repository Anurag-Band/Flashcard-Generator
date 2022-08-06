import React, { useEffect, useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import CreateSingleFlashCard from "./CreateSingleFlashCard";
import { nanoid } from "nanoid";
import axios from "axios";
import Loader from "../assets/loader.svg";

import { useDispatch, useSelector } from "react-redux";
import { setFlashCard } from "../features/flashcard/flashcardSlice";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const cardImageDetails = useSelector(
    (state) => state.flashcard.cardImageDetails
  );
  console.log(cardImageDetails);

  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const [uploadImage, setUploadImage] = useState({
    public_id: "",
    secure_url: "",
  });

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [inputList, setinputList] = useState([
    { id: nanoid(), cardname: "", carddescription: "", cardimage: {} },
  ]);
  const [newInputList, setNewInputList] = useState([{}]);

  console.log(inputList);

  useEffect(() => {
    if (!cardImageDetails.cardImage?.secure_url) return;

    const newInputList = [...inputList];
    let ourList = {};
    ourList = newInputList[cardImageDetails.index];
    ourList.cardimage = cardImageDetails.cardImage;

    console.log("This Is Our LIST!!!", ourList);
    setNewInputList((prevData) => [...prevData, ourList]);

    console.log("New List ->>", newInputList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardImageDetails]);

  const uploadGroupImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    await axios
      .post("https://api.cloudinary.com/v1_1/dkoxjcwg7/image/upload", formData)
      .then((data) => {
        setSelectedFile(data.data.secure_url);
        setUploadImage((prevData) => ({
          ...prevData,
          public_id: data.data.public_id,
          secure_url: data.data.secure_url,
        }));
      });
    setLoading(false);
  };

  const handleAddFlashCard = () => {
    const card = {
      id: nanoid(),
      groupName,
      groupDescription,
      Card: newInputList,
      groupImage: uploadImage,
    };

    console.log(card);

    dispatch(setFlashCard(card));
    handleReset();
    setinputList([{ id: nanoid(), cardname: "", carddescription: "" }]);
    setGroupName("");
    setGroupDescription("");
    setUploadImage({
      public_id: "",
      secure_url: "",
    });
    setSelectedFile("");
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      (textarea) => (textarea.value = "")
    );
    setinputList({
      itemvalues: [{}],
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col m-3 p-4 bg-white text-black drop-shadow-lg space-y-4">
        <div className="flex space-x-10 items-center pt-3">
          <div className="flex flex-col">
            <label htmlFor="groupname">Create Group</label>
            <input
              type="text"
              name="groupname"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {selectedFile ? (
            // eslint-disable-next-line
            <img
              src={selectedFile}
              alt="Select Photo To Upload on Post"
              className="w-48 h-28 object-contain cursor-pointer"
              onClick={() => setSelectedFile(null)}
            />
          ) : (
            <button
              disabled={!groupName}
              onClick={() => filePickerRef.current.click()}
              className={`flex items-center px-5 py-2 mt-6 bg-white border-2 ${
                loading ? "border-none" : "border-slate-300"
              } active:border-blue-500 disabled:active:border-slate-300 disabled:cursor-not-allowed text-blue-700 font-semibold rounded-md space-x-2`}
            >
              <input
                type="file"
                name="groupimage"
                hidden
                ref={filePickerRef}
                onChange={(e) => uploadGroupImage(e.target.files[0])}
              />

              {loading ? (
                <img className="w-12 h-12" src={Loader} alt="Loading..." />
              ) : (
                <>
                  <UploadOutlined />
                  <span>Upload Image</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex flex-col w-10/12">
          <label htmlFor="groupdescription">Add description</label>
          <textarea
            className="resize-none"
            name="groupdescription"
            rows={4}
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col m-3 p-4 bg-white text-black drop-shadow-lg space-y-4">
        {inputList.map((_, i) => (
          <CreateSingleFlashCard
            groupName={groupName}
            inputList={inputList}
            setinputList={setinputList}
            id={nanoid()}
            index={i}
            key={i}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          disabled={!groupName}
          className="py-2 px-5 bg-red-600 disabled:bg-gray-400 text-white font-medium text-md w-44 rounded-md"
          onClick={() => handleAddFlashCard()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateFlashCard;
