import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}


export async function DeleteCabin(id) {

  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be delete");
  }
  return data;
}

// https://elcqlrjjttzoarzsezwa.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

export async function CreateNewEditCabin(createCabin, editMode = false) {
  const imageName = ` ${Math.random()}-${createCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // let query = supabase.from('cabins');
   let Data ,Error
  // editing the row 
  if (editMode) {
    const { data, error } = await supabase
      .from('cabins').update({ ...createCabin, image: typeof createCabin.image === 'string' ? createCabin.image : imagePath, }).eq('id', createCabin.id)
      Data = data;
      Error = error;
    }

  // uploading the  cabin
  if (!editMode) {
    const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...createCabin, image: imagePath }]).select()
    Data = data;
    Error = error;
  }

  // const { data, error } = await query.select().single();

  if (Error) {
    console.error(Error);
    throw new Error(editMode ? ' Cabins could not be update' : "Cabins could not create a new cabin");
  }
  // uploading the image
  if (typeof createCabin.image !== 'string') {

    const { imageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, createCabin.image, {
        cacheControl: '3600',
        upsert: false
      })

    // deleting the cabin if imageError
    imageError && await supabase
      .from('cabins')
      .delete()
      .eq('id', createCabin.id);

    if (imageError) {
      console.error(imageError);
      throw new Error("Image could not be upload and Cabins could not create a new cabin");
    }
  }
  return Data;
}