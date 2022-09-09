import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../components/validation/schema/CardSchema";

import { nanoid } from "nanoid";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/outline";

import { useDispatch } from "react-redux";
import { setFlashCard } from "../features/flashcard/flashcardSlice";
import { useRef } from "react";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);
  const [groupImg, setGroupImg] = useState("");

  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
  };

  return (
    <Formik
      initialValues={{
        groupid: nanoid(),
        groupname: "",
        groupdescription: "",
        groupimg: null,
        cards: [
          {
            cardid: nanoid(),
            cardname: "",
            carddescription: "",
          },
        ],
        createOn: new Date(Date.now()).toLocaleString(),
      }}
      validationSchema={FlashCardSchema}
      onSubmit={addFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="w-full space-y-5">
            <div className="flex flex-col m-3 p-4 bg-white text-black drop-shadow-lg space-y-4 rounded-sm">
              {/* upper */}
              <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3">
                {/* left */}
                <div className="flex flex-col">
                  <h1>Create Group</h1>
                  <Field
                    type="text"
                    name="groupname"
                    placeholder="Enter Group Name"
                  />
                  <ErrorMessage name="groupname" />
                </div>
                {/* right */}
                {groupImg ? (
                  <img
                    src={groupImg}
                    alt="groupImg"
                    className="w-28 h-28 object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => filePickerRef.current.click()}
                    className={`flex items-center px-5 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2`}
                  >
                    <UploadOutlined />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      ref={filePickerRef}
                      value={groupImg}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = () => {
                          setFieldValue("groupimg", reader.result);
                          setGroupImg(reader.result);
                        };
                      }}
                      hidden
                    />
                  </button>
                )}
              </div>
              {/* down */}
              <div className="flex flex-col w-full sm:w-[60%]">
                <h1>Add Description</h1>
                <Field
                  as="textarea"
                  name="groupdescription"
                  rows={4}
                  placeholder="Enter Group Description"
                  className="resize-none"
                />
                <ErrorMessage name="groupdescription" />
              </div>
            </div>
          </div>

          {/* ------------------------- */}

          {/* Add Cards Section  */}
          <FieldArray
            name="cards"
            className="flex flex-col m-3 p-4 bg-white text-black drop-shadow-lg space-y-4"
          >
            {(arrayHelper) => {
              const cards = values.cards;
              return (
                <>
                  {cards && cards.length > 0
                    ? cards.map((card, index) => (
                        <div
                          className="flex items-center space-x-10"
                          key={index}
                        >
                          <div className="p-2 w-10 flex items-center justify-center bg-red-600 text-white text-md font-semibold rounded-full">
                            <p>{index + 1}</p>
                          </div>
                          <div className="flex flex-col jc space-y-5">
                            <Field
                              type="text"
                              name={`cards.${index}.cardname`}
                              placeholder="Enter Card Name"
                            />
                            <ErrorMessage name={`cards.${index}.cardname`} />
                          </div>
                          <div className="flex flex-col justify-center space-y-5">
                            <Field
                              as="textarea"
                              name={`cards.${index}.carddescription`}
                              placeholder="Enter Group Description"
                              className="resize-none w-34"
                            />
                            <ErrorMessage
                              name={`cards.${index}.carddescription`}
                            />
                          </div>
                          <button
                            className={`flex items-center px-5 py-2 mt-6 bg-white border-2 border-blue-600 active:border-slate-300 text-blue-700 font-semibold rounded-md space-x-2
                  } `}
                          >
                            <PlusOutlined />
                            <span>Select Image</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelper.remove(index)}
                          >
                            <TrashIcon className="h-6 text-slate-500" />
                          </button>
                        </div>
                      ))
                    : null}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelper.push({
                        cardid: nanoid(),
                        cardname: "",
                        carddescription: "",
                      })
                    }
                  >
                    Add More
                  </button>
                  <div className="flex justify-center w-full">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="py-2 px-6  bg-red-600 text-white rounded-md"
                    >
                      Create
                    </button>
                  </div>
                </>
              );
            }}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
