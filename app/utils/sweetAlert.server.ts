import Swal, { SweetAlertResult } from "sweetalert2";
export function showSuccessAlert(message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}