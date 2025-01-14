package com.furnistyle.furniturebackend.dtos.bases;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartDetailDTO {
    @NotNull(message = "ID chủ giỏ hàng không được để trống!")
    @JsonProperty("owner_id")
    private Long ownerId;

    @NotNull(message = "ID sản phẩm không được để trống!")
    @JsonProperty("product_id")
    private Long productId;

    @NotNull(message = "Số lượng không được để trống!")
    @Min(value = 1, message = "Số lượng phải lớn hơn hoặc bằng 1!")
    private Integer amount;
}
