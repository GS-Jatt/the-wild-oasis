import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export default function useUpdateSetting(){
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isUpdateing } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["settings"],
          });
          toast.success(" setting is update sussfully");
        },
        onError: (error) => toast.error(error),
      });

      return {updateSetting, isUpdateing};
}