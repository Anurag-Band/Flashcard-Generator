import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { nanoid } from "nanoid";
import axios from "axios";
import Loader from "../assets/loader.svg";

import { useDispatch } from "react-redux";
import { setCardImage } from "../features/flashcard/flashcardSlice";

const CreateSingleFlashCard = ({
  inputList,
  setinputList,
  id,
  index,
  groupName,
}) => {
  const dispatch = useDispatch();
  const editCardInput = useRef();

  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");

  const handleAddMore = () => {
    setinputList([
      ...inputList,
      {
        id: nanoid(),
        cardname: "",
        carddescription: "",
        cardimage: {},
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleRemove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const focusEditInput = () => {
    editCardInput.current.focus();
  };

  const uploadCardImage = async (file, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    await axios
      .post("https://api.cloudinary.com/v1_1/dkoxjcwg7/image/upload", formData)
      .then((data) => {
        try {
          setSelectedFile(data.data.secure_url);

          dispatch(
            setCardImage({
              index: index,
              cardImage: {
                public_id: data.data.public_id,
                secure_url: data.data.secure_url,
              },
            })
          );
        } catch (error) {
          console.log(error);
        }
      });
    setLoading(false);
  };

  return (
    <>
      <fieldset
        disabled={groupName === "" ? "disabled" : ""}
        className={`flex items-center space-x-10 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <div className="p-2 w-10 flex items-center justify-center bg-red-600 text-white text-md font-semibold rounded-full">
          <p>{index + 1}</p>
        </div>
        <div className="flex flex-col justify-center space-y-5">
          <label htmlFor="cardname">Card Name</label>
          <input
            type="text"
            name="cardname"
            ref={editCardInput}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
        <div className="flex flex-col justify-center space-y-5">
          <label htmlFor="carddescription">Card Description</label>
          <textarea
            className="resize-none w-34"
            name="carddescription"
            rows={3}
            cols={50}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>

        {selectedFile ? (
          // eslint-disable-next-line
          <img
            src={selectedFile}
            alt="Select Photo To Upload on Post"
            className="w-48 h-28 object-contain cursor-pointer"
            onClick={() => {
              setSelectedFile(null);
            }}
          />
        ) : (
          <button
            disabled={!groupName}
            onClick={() => filePickerRef.current.click()}
            className={`flex items-center px-5 py-2 mt-6 bg-white border-2 border-blue-500 active:border-blue-300 active:disabled:border-blue-500 text-blue-700 font-semibold rounded-md space-x-2 ${
              loading ? "border-none" : "border-slate-300"
            } `}
          >
            <input
              type="file"
              name="groupimage"
              hidden
              ref={filePickerRef}
              onChange={(e) => uploadCardImage(e.target.files[0], index)}
            />

            {loading ? (
              <img className="w-12 h-12" src={Loader} alt="Loading..." />
            ) : (
              <>
                <PlusOutlined />
                <span>Select Image</span>
              </>
            )}
          </button>
        )}

        <div className="flex flex-col space-y-6">
          {inputList.length !== 1 && (
            <button onClick={() => handleRemove(id)} disabled={!groupName}>
              <TrashIcon className="h-6 text-slate-500" />
            </button>
          )}
          <button onClick={() => focusEditInput()}>
            <PencilAltIcon className="h-6 text-blue-400" />
          </button>
        </div>
      </fieldset>

      {inputList.length - 1 === index && (
        <button
          className="flex justify-start m-3 text-blue-600"
          onClick={handleAddMore}
          disabled={!groupName}
        >
          Add More
        </button>
      )}
    </>
  );
};

export default CreateSingleFlashCard;
