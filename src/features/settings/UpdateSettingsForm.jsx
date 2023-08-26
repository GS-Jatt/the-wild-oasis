import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSetting';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const {isLoading, settings:{minBookingLength, maxBookingLength, maxGuestsPreBooking, breakfastPrice,}={}} = useSettings();
  const {updateSetting, isUpdateing}= useUpdateSetting()
  if(isLoading) return <Spinner/>

  function onUpdate(e, field){
    updateSetting({[field]:e.target.value})
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' disabled={isUpdateing} onBlur={(e)=>onUpdate(e,'minBookingLength')} defaultValue={minBookingLength} id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' disabled={isUpdateing} defaultValue={maxBookingLength} id='max-nights' onBlur={(e)=>onUpdate(e,'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' disabled={isUpdateing} defaultValue={maxGuestsPreBooking} id='max-guests' onBlur={(e)=>onUpdate(e,'maxGuestsPreBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' disabled={isUpdateing}  defaultValue={breakfastPrice} id='breakfast-price' onBlur={(e)=>onUpdate(e,'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
