package kr.co.seoulit.insa.sys.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityService {

    private static final String SECRET_KEY = "dkssudsksmstlflqekgkrhtlvdjTeksrhdtjddnrdlfkrhgoakssktjqkdrkqkdrk";
//    private static final Map<String, String> SECRET_KEY_SET = Map.of(
//            "key1", "dflgknj9458yh5t098yh945whgtagfueiwrtghwkrnbfvjdsfbnjknbsofw4-twuebgkvmnboszdriyht95hu",
//            "key2", "lfgbknseorithngoasnfvjkzxncvknw948h5tg98qw3rhugvnjdkzfnvbksdfngboiurwhg8rthjg0erjmvirjtv98ertuymgrmcljg",
//            "key3", "z;lknmtgfoirengisdfnfvlbnsdkfjngkljdtnhblfkhgjknm[09s9djv098w4ejhw5ijtngktjnhbslkjfnvaisuyehrjfcowkjemfopvjbvuoienasp"
//    );


    // 로그인 서비스로 던질때 같이 실행
    public String createToken(String subject, long expTime) {
        if(expTime <= 0) {
            throw new RuntimeException("expTime must be positive");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256; // 서명 알고리즘

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);    // byte단위의 secret키를 만들어 줘야함
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());    // 새로운 키 객체를 생성

        return Jwts.builder()
                .setSubject(subject)    // 보통 subject는 유저 id 값이 될 수 있음
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis()+expTime))        // 만료시간 set
                .compact();
    }


    // 토큰 검증하는 메서드
    public String getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();      // 여기까지하면 claims이 만들어짐
                                // 만약 해당 알고리즘으로 생성된 토큰이 아니면 null 리턴

        return claims.getSubject();
    }
}
