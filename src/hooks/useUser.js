import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminUserApi } from "../api/user/adminUserApi"

export const useUser = () => {
    const queryClient = useQueryClient();

    const disabledUserMutation = useMutation({
        mutationFn: async({userId})=>{
            const response = await adminUserApi.disabledUser(userId);
            return response;
        },
        onSuccess: ()=>{
            alert('비활성화 처리 되었습니다.');
            queryClient.invalidateQueries({queryKey:['user']});
        },
        onError: (err) => {
            console.error(err);
            alert("비활설화 처리에 실패하였습니다.");
        }
    })
    return{disabledUserMutation}
}