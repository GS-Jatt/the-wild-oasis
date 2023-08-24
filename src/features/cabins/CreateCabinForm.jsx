import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ editCabin = {}, editId }) {
  const editMode = Boolean(editId);
  const { handleSubmit, register, reset, getValues, formState } = useForm({
    defaultValues: editMode ? editCabin : {},
  });

  const { errors } = formState;

const  {createCabin, isCreateing}= useCreateCabin();
  

const {editCabin:EditCabin, isEditing}= useEditCabin();
  

  const isLoading = isCreateing || isEditing;
  function onSubmit(data) {
    if (editMode) {
      EditCabin({
        ...data,
        image: typeof data.image === "string" ? editCabin.image : data.image[0],
        editMode,
      },{onSuccess:reset()});
    } else {
      createCabin({ ...data, image: data.image[0] },{onSuccess:reset()});
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Maxumum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "this field is required",
            min: 1,
            message: "capacity should be at least 1",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "this field is required",
            min: 1,
            message: "capacity should be at least 1",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "dicount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.name?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            required: editMode ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button> {editMode ? "edit cabin " : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
