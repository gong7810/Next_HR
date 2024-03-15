package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class MenuTO {

  private String menu_name;
  private String super_menu_code;
  private String menu_code;
  private String depth;
  private String is_collapse;
  private String menu_url;
  private String navbar_name;

}
